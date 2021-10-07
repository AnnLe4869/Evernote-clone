import { useSelector } from "react-redux";
import { StoreType } from "../redux/type/globalType";

// To return all notebooks
export default function useNotebooks() {
  const allNotebooks = useSelector((store: StoreType) => store.notebooks);

  return {
    allNotebooks,
  };
}
