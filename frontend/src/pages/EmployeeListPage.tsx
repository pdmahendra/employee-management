import { useFetchEmployeeList } from "../api/query/employeeListQuery";
import { EmployeeListTable } from "../components/EmployeeListTable";
import Navbar from "../components/Navbar";

const EmployeeListPage = () => {
  const { data: employeeList, isLoading, refetch } = useFetchEmployeeList();
  if (isLoading) {
    return <div></div>;
  }

  return (
    <>
      <Navbar />
      <EmployeeListTable employeeList={employeeList} refetch={refetch} />
    </>
  );
};

export default EmployeeListPage;
