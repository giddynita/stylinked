import { useDispatch } from 'react-redux'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { handleStepChange } from '@/features/checkout/checkoutSlice'
import { Button } from '../ui/button'
import type { FormEvent } from 'react'

function PaymentInformationForm() {
  const dispatch = useDispatch()
  const handleStep = (step: number) => {
    dispatch(handleStepChange({ step }))
  }
  const handlePaymentFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    /* const formData = {
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
 */
    /* if (
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
    } */
    /* const validatedFields = validateWithZodSchema(shippingInfoSchema, formData)
    if (!validatedFields) {
      return
    } */
    handleStep(3)
  }

  return (
    <form onSubmit={handlePaymentFormSubmit} className="space-y-4">
      <div>
        <Label htmlFor="cardNumber">Card Number</Label>
        <Input
          id="cardNumber"
          name="cardNumber"
          /* value={formData.cardNumber}
          onChange={handleInputChange} */
          placeholder="1234 5678 9012 3456"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="expiryDate">Expiry Date</Label>
          <Input
            id="expiryDate"
            name="expiryDate"
            /* value={formData.expiryDate}
            onChange={handleInputChange} */
            placeholder="MM/YY"
            required
          />
        </div>
        <div>
          <Label htmlFor="cvv">CVV</Label>
          <Input
            id="cvv"
            name="cvv"
            /* value={formData.cvv}
            onChange={handleInputChange} */
            placeholder="123"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="nameOnCard">Name on Card</Label>
        <Input
          id="nameOnCard"
          name="nameOnCard"
          /* value={formData.nameOnCard}
          onChange={handleInputChange} */
          required
        />
      </div>

      <div className="flex space-x-3">
        <Button
          variant="outline"
          onClick={() => handleStep(1)}
          className="flex-1"
        >
          Back to Shipping
        </Button>
        <Button
          type="submit"
          className="flex-1 bg-purple-600 hover:bg-purple-700"
        >
          Review Order
        </Button>
      </div>
    </form>
  )
}
export default PaymentInformationForm
