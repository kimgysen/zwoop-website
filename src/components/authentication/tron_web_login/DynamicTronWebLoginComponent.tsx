import dynamic from 'next/dynamic';


const DynamicTronWebLoginComponent = dynamic(
    () => import('./TronWebLoginComponent'),
    { ssr: false }
)

export default DynamicTronWebLoginComponent;
