import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const services = [
	{
		title: "Laser Hair Removal",
		subtitle: "Free Consultation",
		image: "/services/laser-hair-removal.jpg",
	},
	{
		title: "Botox",
		subtitle: "Free Consultation",
		image: "/services/botox.jpg",
	},
	{
		title: "Dermal Fillers",
		subtitle: "Free Consultation",
		image: "/services/dermal-fillers.jpg",
	},
	{
		title: "Lip Fillers",
		subtitle: "Free Consultation",
		image: "/services/lip-fillers.jpg",
	},
];

export function ServicesGallery() {
	return (
		<section className="container py-8">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{services.map((service, idx) => (
					<div
						key={service.title}
						className="relative rounded-lg overflow-hidden group min-h-[320px] flex items-end"
						style={{ minHeight: 320 }}
					>
						<Image
							src={service.image}
							alt={service.title}
							fill
							className="object-cover group-hover:scale-105 transition-transform duration-300"
							sizes="(max-width: 768px) 100vw, 50vw"
						/>
						<div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
						<div className="relative z-10 p-6 flex flex-col justify-end h-full w-full">
							<h2 className="text-2xl md:text-3xl font-semibold text-white mb-1 drop-shadow-lg">
								{service.title}
							</h2>
							<div className="text-lg text-white mb-6 drop-shadow-lg">
								{service.subtitle}
							</div>
							<Link
								href={`/services/${service.title
									.toLowerCase()
									.replace(/ /g, "-")}`}
							>
								<Button className="bg-white text-black font-semibold rounded-full px-6 py-2 w-fit shadow-lg text-base">
									Book now
								</Button>
							</Link>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
