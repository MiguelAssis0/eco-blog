import { Suspense } from "react";
import SearchNews from "../components/SearchNews";

export default function SearchPage() {
    return (
        <Suspense fallback={<p>Carregando...</p>}>
            <SearchNews />
        </Suspense>
    );
}
