import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import { useFetchEmployee } from "../api/query/getEmployeeQuery";
import { useEditEmployeeQuery } from "../api/query/editEmployee";

interface EmployeeData {
  name?: string;
  email?: string;
  mobile?: string;
  gender?: string;
  designation?: string;
  courses?: string[];
}

export default function EditEmployeeDialog({
  refetch,
  id,
}: {
  refetch: () => void;
  id: string;
}) {
  const [data, setData] = useState<EmployeeData>({
    name: "",
    email: "",
    mobile: "",
    gender: "",
    designation: "",
    courses: [],
  });

  const [open, setOpen] = useState(false);
  const { mutate: editEmployee } = useEditEmployeeQuery();

  const {
    data: employeeData,
    isLoading,
    isError,
  } = useFetchEmployee(open ? id : "");
  useEffect(() => {
    if (open && employeeData) {
      setData(employeeData);
    }
  }, [open, employeeData]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetFormFields();
  };

  const handleInputChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleCourseChange = (e: any) => {
    const { value, checked } = e.target;

    setData((prevData) => ({
      ...prevData,
      courses: checked
        ? [...(prevData.courses ?? []), value]
        : (prevData.courses || []).filter((course) => course !== value),
    }));
  };

  const resetFormFields = () => {
    setData({
      name: "",
      email: "",
      mobile: "",
      designation: "",
      gender: "",
      courses: [],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await editEmployee({ data, id },
        {
          onSuccess: () => {
            toast.success("Employee created successfully!");
            refetch();
            handleClose();
            resetFormFields();
          },
          onError: (error: any) => {
            const message =
              error?.response?.data?.message || "Error creating employee.";
            toast.error(message);
          },
        });
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Error updating employee.";
      toast.error(message);
    }
  };

  return (
    <div>
      <button
        className="px-3 py-1 bg-black text-white rounded"
        onClick={handleClickOpen}
      >
        Edit
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: "30px",
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: "500", fontSize: "1.4rem" }}>
          Edit Employee
        </DialogTitle>
        <DialogContent>
          {isLoading ? (
            <div>Loading employee data...</div>
          ) : isError ? (
            <div>Error fetching employee data.</div>
          ) : (
            <>
              <TextField
                required
                margin="dense"
                id="name"
                name="name"
                label="Name"
                type="text"
                fullWidth
                variant="outlined"
                value={data.name}
                onChange={handleInputChange}
              />
              <TextField
                required
                margin="dense"
                id="email"
                name="email"
                label="Email"
                type="text"
                fullWidth
                variant="outlined"
                value={data.email}
                onChange={handleInputChange}
              />
              <TextField
                required
                margin="dense"
                id="mobile"
                name="mobile"
                label="Mobile No"
                type="number"
                fullWidth
                variant="outlined"
                value={data.mobile}
                onChange={handleInputChange}
              />
              <FormControl fullWidth margin="dense" variant="outlined">
                <InputLabel id="designation-label">Designation</InputLabel>
                <Select
                  labelId="designation-label"
                  id="designation"
                  name="designation"
                  label="Designation"
                  fullWidth
                  value={data.designation}
                  onChange={handleInputChange}
                >
                  <MenuItem value="HR">HR</MenuItem>
                  <MenuItem value="Manager">Manager</MenuItem>
                  <MenuItem value="Sales">Sales</MenuItem>
                </Select>
              </FormControl>
              <FormControl component="fieldset" margin="dense">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  row
                  name="gender"
                  value={data.gender}
                  onChange={handleInputChange}
                >
                  <FormControlLabel
                    value="Male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="Female"
                    control={<Radio />}
                    label="Female"
                  />
                </RadioGroup>
              </FormControl>
              <div className="flex">
                <FormControl component="fieldset" margin="dense">
                  <FormLabel component="legend">Courses</FormLabel>
                  <div className="flex">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={data.courses?.includes("MCA") ?? false}
                          onChange={handleCourseChange}
                          value="MCA"
                        />
                      }
                      label="MCA"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={data.courses?.includes("BCA") ?? false}
                          onChange={handleCourseChange}
                          value="BCA"
                        />
                      }
                      label="BCA"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={data.courses?.includes("BSC") ?? false}
                          onChange={handleCourseChange}
                          value="BSC"
                        />
                      }
                      label="BSC"
                    />
                  </div>
                </FormControl>
              </div>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <button
            onClick={handleClose}
            className="text-red-500 px-4 py-2 border-2 rounded-xl"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="text-white bg-[#3F51D7] font-medium px-8 py-2 border-2 rounded-xl"
          >
            Update
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
