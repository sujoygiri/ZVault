import { createRoot } from "react-dom/client";
import Vault from "./Vault";

const _zvault = createRoot(document.getElementById("_zvault")!);

_zvault.render(<Vault />)
