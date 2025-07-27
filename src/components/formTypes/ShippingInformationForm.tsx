import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import {
  handleShippingFormInput,
  handleStepChange,
} from '@/features/checkout/checkoutSlice'
import { useUserData } from '@/utils/hooks'
import { useUser } from '@supabase/auth-helpers-react'
import { shippingInfoSchema, validateWithZodSchema } from '@/utils/schema'
import { toast } from 'sonner'
import type { FormEvent } from 'react'

function ShippingInformationForm() {
  const { data: userInfo } = useUserData()
  const user = useUser()

  const { shippingForm } = useSelector((state: any) => state.checkoutState)
  const {
    email,
    firstname,
    lastname,
    address,
    city,
    state,
    zipcode,
    phone,
    country,
  } = shippingForm
  const dispatch = useDispatch()
  const handleInputChange = (key: string, value: string | number) => {
    dispatch(handleShippingFormInput({ key, value }))
  }
  const handleStep = (step: number) => {
    dispatch(handleStepChange({ step }))
  }
  const handleShippingFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = {
      email,
      firstname,
      lastname,
      address,
      city,
      state,
      zipcode,
      phone,
      country,
    }

    if (
      !email ||
      !firstname ||
      !lastname ||
      !address ||
      !city ||
      !state ||
      !zipcode ||
      !phone ||
      !country
    ) {
      return toast.warning('All fields are required. Please complete the form')
    }
    const validatedFields = validateWithZodSchema(shippingInfoSchema, formData)
    if (!validatedFields) {
      return
    }
    handleStep(2)
  }

  return (
    <form onSubmit={handleShippingFormSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            placeholder={user?.email}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={phone}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            placeholder={userInfo?.userData?.phone}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstname">First Name</Label>
          <Input
            id="firstname"
            name="firstname"
            value={firstname}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            placeholder={userInfo?.userData?.firstname}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastname">Last Name</Label>
          <Input
            id="lastname"
            name="lastname"
            value={lastname}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            placeholder={userInfo?.userData?.lastname}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          name="address"
          value={address}
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          placeholder="123 Main St"
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="zipcode">ZIP Code</Label>
          <Input
            id="zipcode"
            name="zipcode"
            type="number"
            value={zipcode}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            name="city"
            value={city}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            name="state"
            value={state}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Input id="country" name="country" value={country} disabled />
        </div>
      </div>

      <Button type="submit" className="w-full mt-4">
        Continue to Review
      </Button>
    </form>
  )
}
export default ShippingInformationForm
