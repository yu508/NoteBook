import React from 'react';
import cl from "./MyModel.module.css"

const MyModal = ({children, visible, setVisible}) => {
	
	const rootClasses = [cl.myModal]

	if (visible) {
		console.log("був клік")
    rootClasses.push(cl.active)
  }
	
	return (
		<div className={rootClasses.join(' ')} onClick={()=>setVisible(false)}>
			<div 
				className={cl.myModalContent}
				onClick={(e) => e.stopPropagation()}
				>
					{children}
			</div>
		</div>
	);
}

export default MyModal;
