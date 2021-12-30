import dynamic from "next/dynamic";


const StompClientDynamic = dynamic(() => import('./StompClient'), {
    ssr: false,
});

export default StompClientDynamic;
