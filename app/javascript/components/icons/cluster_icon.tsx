import React, { ComponentProps } from 'react'

interface ClusterIconProps extends ComponentProps<"div"> {
  count: number;
  size: number;
}

const ClusterIcon: React.FC<ClusterIconProps> = ({ count, size, ...props }) => {
  return (
    <div 
        className='cluster-icon' 
        style={{
        width: size,
        height: size,
        backgroundColor: "rgba(0, 123, 255, 0.8)",
        lineHeight: `${size}px`,
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontWeight: "bold",
      }} {...props}>
        {count}
    </div>
  )
}

export default ClusterIcon