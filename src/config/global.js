import { toast } from "react-toastify"
import { dayjs } from 'dayjs'

window.getRandomId = () => {
    return Math.random().toString(36).slice(2)
}

window.timestampToDate = (date, format = "DD-MM-YYYY") => {
    return date ? dayjs(date.seconds * 1000).format(format) : "";
}

window.notify = (msg, type) => {
    let option = {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }
    console.log(msg, type)
    switch (type) {
        case "success":
            toast.success(msg, option)
            break;
        case "error":
            toast.error(msg, option)
            break;
        case "warning":
            toast.warning(msg, option)
            break;
        default:
            toast(msg, option)
    }
}