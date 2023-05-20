<button
	on:click
	class={`mt-6 w-full rounded-lg ${
		$$restProps.disabled ? `bg-orange-300` : `bg-orange-500`
	}  py-2.5 px-3 font-semibold text-white 
	${
		$$restProps.disabled ? `` : `hover:bg-orange-600`
	} cursor-pointer focus:outline-none shadow capitalize`}
	{...$$restProps}><slot /></button
>
