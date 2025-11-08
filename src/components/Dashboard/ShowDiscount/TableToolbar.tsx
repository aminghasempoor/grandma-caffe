import { AddDiscount } from "./AddDiscount";
import SearchComponent from "./SearchComponent";
import ResetFilters from "@/components/Dashboard/ShowDiscount/ResetFilters";

const TableToolbar = () => {
    return (
        <div className={"flex items-center justify-between "}>
            <div className={"flex items-center justify-start gap-5"}>
                <AddDiscount />
                <SearchComponent />
            </div>
            <div>
                <ResetFilters />
            </div>
        </div>
    );
};

export default TableToolbar;
