function ImageCarousel({ carouselItems }: { carouselItems: string[] }) {
  return (
    <div className="carousel rounded-box h-[40vh] w-full">
      {carouselItems.map((item: string, index) => {
        return (
          <div key={index} className="carousel-item w-[40%]">
            <img
              src={item}
              alt="carousel item"
              className="w-full object-cover"
              loading="lazy"
            />
          </div>
        )
      })}
    </div>
  )
}
export default ImageCarousel
