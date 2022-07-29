import * as React from "react"

function SVGDoubleArrow(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 1000 1000"
      {...props}
    >
      <path d="M632.1 496.3l-.4-.1.4-.1 341.8-357.7C1031 83.5 922.3-30.9 861 22.2L432.6 457.8c-21.6 21.4-20.1 58.6 0 76.7L861 970.1c61.3 53.1 170.1-61.3 112.9-116.1L632.1 496.3z" />
      <path d="M225.2 504l-.4-.1.4-.1L567 146c57.1-54.8-51.6-169.2-112.9-116.1L25.7 465.5c-21.6 21.4-20.1 58.6 0 76.7l428.4 435.6c61.3 53.1 170.1-61.3 112.9-116.1L225.2 504z" />
    </svg>
  )
}

export default SVGDoubleArrow
