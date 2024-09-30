import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
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
import { useCreateEmployeeQuery } from "../api/query/createEmployeeQuery";
interface EmployeeData {
  name: string;
  email: string;
  mobile: string;
  gender: string;
  designation: string;
  courses: string[];
}

export default function CreateEmployeeDialog({
  refetch,
}: {
  refetch: () => void;
}) {
  const { mutate: createEmployee } = useCreateEmployeeQuery();
  const [data, setData] = useState<EmployeeData>({
    name: "",
    email: "",
    mobile: "",
    gender: "",
    designation: "",
    courses: [],
  });

  //   const [file, setFile] = useState()
  //   function handleChange(event:any) {
  //     setFile(event.target.files[0])
  //   }

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
      await createEmployee(
        { data },
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
        }
      );
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Error creating employee.";
      toast.error(message);
      console.error(error);
    }
  };

  return (
    <div>
      <button
        className="text-[1rem] rounded-lg bg-[#3F51D7] px-3 py-1 text-white font-bold whitespace-nowrap"
        onClick={handleClickOpen}
      >
        Create Employee{" "}
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
          Create Employee
        </DialogTitle>{" "}
        <DialogContent>
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
              onChange={handleInputChange}
            >
              <MenuItem value="HR">HR</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="Sales">Sales</MenuItem>
            </Select>
          </FormControl>
          <FormControl component="fieldset" margin="dense">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup row name="gender" onChange={handleInputChange}>
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
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
              <div className="flex ">
                <div>
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
                </div>
                <div>
                  {" "}
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
                </div>
                <div>
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
              </div>
            </FormControl>
          </div>

          {/* <div>
            <h1>Image Upload</h1>
            <input type="file" onChange={handleChange}/>
          </div> */}
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
            Create
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
