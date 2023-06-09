import {createRouter, createWebHistory} from 'vue-router';
import Livres from "../components/Livres.vue";
import DetailLivre from "../components/Detaillivre.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "livres",
            component: Livres
        },
        {
            path: "/detail/:idLivre",
            name: "detail",
            component: DetailLivre,
        }
    ]
});
export default router;