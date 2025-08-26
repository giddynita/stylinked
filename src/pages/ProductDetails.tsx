import { useParams } from 'react-router-dom'
import { Cart } from '@/components/marketplace'
import { useSingleProduct } from '@/utils/hooks'
import { ProductInfoSkeleton } from '@/components/skeletons'
import SubPagesHeader from '@/components/headers/SubPagesHeader'
import { PageHeading } from '@/components/headings'
import { GiveReview, ProductImages } from '@/components/productDetails'
import { lazy } from 'react'
import { nullSuspense, sectionSuspense } from '@/utils/suspense'

const ProductReviews = lazy(() => import('@/components/global/ProductReviews'))
const ProductInfo = lazy(
  () => import('@/components/productDetails/ProductInfo')
)
const FetchingError = lazy(() => import('@/components/global/FetchingError'))

const ProductDetails = () => {
  const { productid } = useParams()
  //fech single product
  const id = productid == undefined ? '' : productid
  const {
    data: product,
    isLoading: productLoading,
    isError,
  } = useSingleProduct(id)

  return (
    <div className="min-h-screen relative container">
      <SubPagesHeader currentPage={product?.name} previousPage="marketplace" />

      <PageHeading
        pageTitle={`Product - ${product?.name}`}
        pageDesc={product?.description}
      />

      {productLoading ? (
        <ProductInfoSkeleton />
      ) : (
        <>
          <main>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
              <ProductImages product={product} />

              {sectionSuspense(<ProductInfo product={product} />)}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
              <section>
                {sectionSuspense(
                  <ProductReviews reviews={product?.productReviews} />
                )}
              </section>
              <GiveReview product={product} />
            </div>

            <div className="border bg-background shadow-xs hover:bg-accent group hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 cursor-pointer fixed w-14 h-14 sm:h-18 sm:w-18 rounded-full flex items-center justify-center top-1/3 -translate-y-1/3 right-4">
              <Cart />
            </div>
          </main>
          {nullSuspense(<FetchingError isError={isError} text="product" />)}
        </>
      )}
    </div>
  )
}

export default ProductDetails
