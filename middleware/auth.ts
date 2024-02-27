import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore();

  if (!auth.user) {
    if (to.path.includes("/subscribtions") || to.path.includes("/orders")) {
      auth.setIsNavigatingToLogin(true);
      return false;
    } else {
      auth.setIsNavigatingToLogin(false);
    }

    return;
  }
});
