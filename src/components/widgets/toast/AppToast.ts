import {Slide, toast} from "react-toastify";


export const infoToast = (title: string) => {
    toast.configure();
    toast.info(title, {
        position: "bottom-right",
        autoClose: 2000,
        transition: Slide,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

}
