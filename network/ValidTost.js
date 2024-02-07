import { useToast } from "primevue/usetoast";

export function toast_handel() {
    const toast = useToast();
    const notify_toast = (msg , type , time) => {
        toast.add({ severity: `${type}`, summary: '', detail: `${msg}`, life: time || 3000 })
    }
    return { toast , notify_toast }
}
