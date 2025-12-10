import { cn } from '@/shared/lib/utils'
import { X } from 'lucide-react'
import { useEffect } from 'react'

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	title: string
	children: React.ReactNode
	className?: string
}

export function Modal({
	isOpen,
	onClose,
	title,
	children,
	className,
}: ModalProps) {
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}
		return () => {
			document.body.style.overflow = ''
		}
	}, [isOpen])

	return (
		<section
			className={cn(
				'fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-150',
				isOpen
					? 'pointer-events-auto opacity-100'
					: 'pointer-events-none opacity-0'
			)}
		>
			<div
				className={cn(
					'absolute inset-0 bg-black/50 transition-opacity duration-150',
					isOpen ? 'opacity-100' : 'opacity-0'
				)}
				onClick={onClose}
			/>
			<div
				className={cn(
					'bg-background relative flex max-h-[90vh] w-full max-w-md flex-col rounded-lg border border-gray shadow-lg transition-all duration-150',
					className,
					isOpen ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
				)}
				onClick={e => e.stopPropagation()}
			>
				<div className='border-light-gray/20 flex items-center justify-between border-b-2 px-6 py-4'>
					<h2 className='text-foreground text-xl font-bold'>{title}</h2>
					<button
						onClick={onClose}
						className='text-foreground/60 hover:text-foreground cursor-pointer transition-colors duration-200'
					>
						<X className='h-6 w-6' />
					</button>
				</div>
				<div className='custom-scrollbar h-full overflow-y-auto p-6'>
					{children}
				</div>
			</div>
		</section>
	)
}
