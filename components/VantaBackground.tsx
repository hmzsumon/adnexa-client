'use client'; // 🔴 এটা থাকতে হবে

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function VantaBackground() {
	const vantaRef = useRef<HTMLDivElement>(null);
	const [vantaEffect, setVantaEffect] = useState<any>(null);

	useEffect(() => {
		let effect: any;

		import('vanta/dist/vanta.fog.min').then((FOG) => {
			if (!vantaEffect && vantaRef.current) {
				effect = FOG.default({
					el: vantaRef.current,
					THREE,
					mouseControls: true,
					touchControls: true,
					gyroControls: false,
					minHeight: 200,
					minWidth: 200,
					highlightColor: 0x8a44ff,
					midtoneColor: 0x1f193d,
					lowlightColor: 0x0b0e2c,
					baseColor: 0x070b28,
					blurFactor: 0.8,
					zoom: 1,
					speed: 2,
				});

				setVantaEffect(effect);
			}
		});

		return () => {
			if (effect) effect.destroy();
		};
	}, [vantaEffect]);

	return <div ref={vantaRef} className='w-full h-full bg_vanta' />;
}
