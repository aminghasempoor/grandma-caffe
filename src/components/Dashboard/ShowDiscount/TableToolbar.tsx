import {AddDiscount} from "./AddDiscount";
import SearchComponent from "./SearchComponent";

const TableToolbar = () => {
    return (
        <div className={"flex items-center justify-start gap-5"}>
            <AddDiscount/>
            <SearchComponent/>
        </div>
    );
};

export default TableToolbar;
