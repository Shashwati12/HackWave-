"use client"

import { useState, useEffect, FormEvent, ChangeEvent } from "react"
import { X, User, Search, Plus } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "@radix-ui/react-label"
import { Separator } from "../ui/separator"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { registrationApi, authApi } from "../../lib/api"
import toast from "react-hot-toast"

// ------------------ Types ------------------

interface UserType {
  id: string
  name: string
  email: string
}

interface EventType {
  id: string
  teamEvent: boolean
  min_team_size?: number
  max_team_size?: number
  isFree?: boolean
  registration_fee?: number
}

interface RegisterFormProps {
  event: EventType
  onSuccess?: (data: any) => void
}

interface FormDataType {
  teamName: string
  teamMembers: UserType[]
  participantPhone?: string
  paymentMethod?: string
}

// ------------------ Component ------------------

export default function RegisterForm({ event, onSuccess }: RegisterFormProps) {
  const [formData, setFormData] = useState<FormDataType>({
    teamName: "",
    teamMembers: [],
  })

  const [searchQuery, setSearchQuery] = useState<string>("")
  const [searchResults, setSearchResults] = useState<UserType[]>([])
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [isRegistering, setIsRegistering] = useState<boolean>(false)
  const [errors, setErrors] = useState<Record<string, string | null>>({})
  const [currentUser, setCurrentUser] = useState<UserType | null>(null)

  // ------------------ Fetch current user ------------------
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await authApi.getProfile()
        if (response.data) {
          setCurrentUser(response.data as UserType)
        }
      } catch (error) {
        console.error("Error fetching current user:", error)
        toast.error("Failed to fetch user profile")
      }
    }
    fetchCurrentUser()
  }, [])

  const isTeamEvent = event.teamEvent

  // Set default team name for solo events
  useEffect(() => {
    if (!isTeamEvent && currentUser) {
      setFormData((prev) => ({
        ...prev,
        teamName: currentUser.name,
      }))
    }
  }, [isTeamEvent, currentUser])

  // ------------------ Search user ------------------
  const handleSearchUser = async (query: string) => {
    setSearchQuery(query)
    if (query.length > 2) {
      setIsSearching(true)
      try {
        if (query.includes("@")) {
          const response = await authApi.getUserIdByEmail(query)
          if (response.data) {
            const foundUser = response.data as UserType

            // Prevent duplicate or self
            if (
              formData.teamMembers.some((member) => member.id === foundUser.id) ||
              foundUser.id === currentUser?.id
            ) {
              setSearchResults([])
              toast.info("This user is already part of your team")
              setIsSearching(false)
              return
            }

            // Check registration
            try {
              const registrationCheck = await registrationApi.checkUserEventRegistration(
                foundUser.id,
                event.id
              )

              if (registrationCheck.data && registrationCheck.data.isRegistered) {
                setSearchResults([])
                toast.warning("This user is already registered for this event in another team")
                setIsSearching(false)
                return
              }

              setSearchResults([foundUser])
            } catch (regError) {
              console.error("Error checking registration:", regError)
              setSearchResults([foundUser])
              toast.warning("Could not verify user's registration status")
            }
          } else {
            setSearchResults([])
          }
        } else {
          toast.info("Please enter a complete email address to find users")
          setSearchResults([])
        }
      } catch (error: any) {
        console.error("Error searching users:", error)
        if (error.response?.status === 404) {
          toast.error("No user found with this email address")
        } else {
          toast.error("Failed to search by email")
        }
        setSearchResults([])
      } finally {
        setIsSearching(false)
      }
    } else {
      setSearchResults([])
      setIsSearching(false)
    }
  }

  // ------------------ Team Members ------------------
  const handleAddTeamMember = (user: UserType) => {
    if (
      formData.teamMembers.some((member) => member.id === user.id) ||
      user.id === currentUser?.id
    ) {
      return
    }

    const newMember: UserType = { id: user.id, name: user.name, email: user.email }
    setFormData({
      ...formData,
      teamMembers: [...formData.teamMembers, newMember],
    })
    setSearchQuery("")
    setSearchResults([])
  }

  const handleRemoveTeamMember = (index: number) => {
    const updatedMembers = [...formData.teamMembers]
    updatedMembers.splice(index, 1)
    setFormData({
      ...formData,
      teamMembers: updatedMembers,
    })
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      })
    }
  }

  // ------------------ Submit ------------------
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsRegistering(true)
    setErrors({})

    try {
      let validationErrors: Record<string, string> = {}

      if (isTeamEvent && !formData.teamName.trim()) {
        validationErrors.team_name = "Team name is required"
      }

      const totalTeamSize = formData.teamMembers.length + 1
      if (isTeamEvent && event.min_team_size && totalTeamSize < event.min_team_size) {
        validationErrors.member_ids = `Team must have at least ${event.min_team_size} members`
      }
      if (isTeamEvent && event.max_team_size && totalTeamSize > event.max_team_size) {
        validationErrors.member_ids = `Team cannot have more than ${event.max_team_size} members`
      }

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors)
        throw new Error("Please fix the validation errors")
      }

      const memberIds = formData.teamMembers.map((m) => m.id)
      if (currentUser && !memberIds.includes(currentUser.id)) {
        memberIds.unshift(currentUser.id)
      }

      const registrationData = {
        event_id: event.id,
        team_name: formData.teamName,
        member_ids: memberIds,
      }

      const response = await registrationApi.register(registrationData)

      if (onSuccess) {
        onSuccess(response.data)
      }

      toast.success("Registration Complete", {
        description: "You have successfully registered for this event.",
      })
    } catch (error: any) {
      console.error("Registration error:", error)
      if (error.response?.data) {
        setErrors((prev) => ({
          ...prev,
          ...(error.response.data.errors || { general: error.response.data.message }),
        }))
      } else if (!Object.keys(errors).length) {
        setErrors({
          general: error.message || "An error occurred during registration.",
        })
      }
      toast.error("Registration Failed", {
        description:
          errors.general || error.response?.data?.message || error.message || "Failed to complete registration.",
      })
    } finally {
      setIsRegistering(false)
    }
  }

  const isTeamValid = (): boolean => {
    if (!isTeamEvent) return true
    if (!formData.teamName.trim()) return false

    const totalTeamSize = formData.teamMembers.length + 1
    const minTeamSize = event.min_team_size || 1
    if (totalTeamSize < minTeamSize) return false
    if (event.max_team_size && totalTeamSize > event.max_team_size) return false
    return true
  }

  if (!currentUser) {
    return <div className="p-4 text-center">Loading your profile...</div>
  }

  const maxTeamSize = event.max_team_size || 5
  const minTeamSize = event.min_team_size || 1

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-b from-blue-50 via-white to-blue-100 p-6 rounded-xl shadow-md space-y-6"
    >
      {errors.general && (
        <div className="p-3 bg-red-100 border border-red-300 text-red-600 rounded-md">
          {errors.general}
        </div>
      )}
      
      {/* User Information Section */}
      <div className="space-y-2">
        <h3 className="font-semibold text-lg text-[#003366]">Your Information</h3>
        <div className="bg-white p-3 rounded-md border border-blue-100">
          <div className="font-medium text-[#003366]">{currentUser.name}</div>
          <div className="text-sm text-gray-500">{currentUser.email}</div>
          {isTeamEvent && <div className="text-xs text-green-600">Team Leader</div>}
        </div>

        {!event?.isFree && (
          <div className="grid gap-2 mt-2">
            <Label htmlFor="participantPhone">Contact Phone Number</Label>
            <Input
              id="participantPhone"
              name="participantPhone"
              type="tel"
              value={formData.participantPhone}
              onChange={handleInputChange}
              required
              className="bg-[#e0f2fe] text-[#003366]"
            />
            {errors.participantPhone && (
              <p className="text-sm text-red-500">{errors.participantPhone}</p>
            )}
          </div>
        )}
      </div>
      {/* Team Information Section */}
      {isTeamEvent && (
        <>
          <Separator />
          <div className="space-y-2">
            <h3 className="font-semibold text-lg text-[#003366]">Team Information</h3>
            <p className="text-sm text-gray-600">
              Maximum team size: {maxTeamSize} members (including you)
              {minTeamSize > 1 && 
                `, minimum ${minTeamSize} members`}
            </p>

            <div className="grid gap-2">
              <Label htmlFor="teamName">Team Name</Label>
              <Input
                id="teamName"
                name="teamName"
                value={formData.teamName}
                onChange={handleInputChange}
                required
                className="bg-[#e0f2fe] text-[#003366]"
                placeholder="Enter your team name"
              />
              {errors.team_name && (
                <p className="text-sm text-red-500">{errors.team_name}</p>
              )}
            </div>

            <div className="mt-4">
              <Label className="text-[#003366]">Team Members</Label>
              <p className="text-sm text-gray-600 mb-2">
                {formData.teamMembers.length === 0 
                  ? "You are currently the only team member."
                  : "You and your team members:"}
              </p>

              {/* Current user displayed first */}
              <div className="flex items-center gap-2 bg-blue-50 p-2 rounded-md border border-blue-200 mb-3">
                <User className="h-4 w-4 text-blue-500" />
                <div className="flex-grow">
                  <div className="font-medium text-[#003366]">{currentUser.name} (You)</div>
                  <div className="text-xs text-gray-500">{currentUser.email}</div>
                </div>
              </div>

              {formData.teamMembers.length > 0 && (
                <div className="space-y-3">
                  {formData.teamMembers.map((member, index) => (
                    <div key={index} className="flex items-center gap-2 bg-white p-2 rounded-md border">
                      <div className="flex-grow">
                        <div className="font-medium text-[#003366]">{member.name}</div>
                        <div className="text-xs text-gray-500">{member.email}</div>
                      </div>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleRemoveTeamMember(index)}
                      >
                        <X className="h-4 w-4 text-gray-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              
              {errors.member_ids && (
                <p className="text-sm text-red-500 mt-2">{errors.member_ids}</p>
              )}

              {/* Display team size info */}
              <div className="mt-2 text-sm">
                <span className={
                  formData.teamMembers.length + 1 > maxTeamSize 
                    ? "text-red-500" 
                    : minTeamSize > 1 && formData.teamMembers.length + 1 < minTeamSize
                    ? "text-amber-500"
                    : "text-green-600"
                }>
                  Current team size: {formData.teamMembers.length + 1} / {maxTeamSize} members
                </span>
              </div>

              {/* Team member search - only show if not at max capacity */}
              {/* Team member search - only show if not at max capacity */}
{formData.teamMembers.length < maxTeamSize - 1 && (
  <div className="mt-4">
    <div className="relative flex">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
      <Input
        placeholder="Search for team members by name or email..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-9 bg-[#e0f2fe] text-[#003366] flex-grow"
      />
      <Button 
        type="button"
        onClick={() => handleSearchUser(searchQuery)}
        className="ml-2 bg-blue-600 hover:bg-blue-700 text-white"
      >
        Search
      </Button>
    </div>

    {/* Loading indicator */}
    {isSearching && (
      <div className="flex justify-center p-2 mt-1">
        <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    )}

    {/* Search results */}
    {searchResults.length > 0 && !isSearching && (
      <div className="mt-1 border rounded-md shadow-sm overflow-hidden bg-white">
        <ul className="max-h-40 overflow-y-auto">
          {searchResults.map((user) => (
            <li
              key={user.id}
              className="p-2 hover:bg-[#d1d5db] cursor-pointer flex justify-between items-center"
              onClick={() => handleAddTeamMember(user)}
            >
              <div>
                <div className="font-medium text-[#003366]">{user.name}</div>
                <div className="text-xs text-gray-500">{user.email}</div>
              </div>
              <Plus className="h-4 w-4 text-blue-500" />
            </li>
          ))}
        </ul>
      </div>
    )}

    {/* No results message */}
    {searchQuery.length > 2 && searchResults.length === 0 && !isSearching && (
      <div className="mt-1 border rounded-md p-2 text-sm text-gray-500 bg-white">
        No users found with that name or email. Users must be registered in the system to join your team.
      </div>
    )}
  </div>
)}
            </div>
          </div>
        </>
      )}

      {/* Payment Section - Only show if event has a registration fee */}
      {!event?.isFree && event?.registration_fee > 0 && (
        <>
          <Separator />
          <div className="space-y-2">
            <h3 className="font-semibold text-lg text-[#003366]">Payment Information</h3>
            <p className="text-sm text-gray-600">Registration fee: ${event.registration_fee}</p>

            <RadioGroup
              defaultValue="online"
              name="paymentMethod"
              value={formData.paymentMethod}
              onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
              className="mt-3"
            >
              <div className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value="online" id="online" />
                <Label htmlFor="online">Online Payment</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="offline" id="offline" />
                <Label htmlFor="offline">Pay at Registration Desk</Label>
              </div>
            </RadioGroup>
          </div>
        </>
      )}

      {/* Submit Button */}
      <div className="flex justify-end mt-6">
        <Button 
          type="submit" 
          disabled={isRegistering || !isTeamValid()} 
          className={`${
            isTeamValid() 
              ? "bg-blue-600 hover:bg-blue-700" 
              : "bg-gray-400 cursor-not-allowed"
          } text-white font-medium px-4 py-2 rounded-md`}
        >
          {isRegistering ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
              Registering...
            </>
          ) : (
            "Complete Registration"
          )}
        </Button>
      </div>
    </form>
  )
}