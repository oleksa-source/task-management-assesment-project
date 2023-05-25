import { KeyboardEvent, useCallback, useState } from "react";
import { useStore } from "../../stores/use-store";
import { DatePicker, DateValidationError, LocalizationProvider } from "@mui/x-date-pickers";
import { Button, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { PickerChangeHandlerContext } from "@mui/x-date-pickers/internals/hooks/usePicker/usePickerValue.types";

const onEnterPress = (cb: any) => {
    return (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            cb();
        }
    };
};

export const TaskNew = () => {
  const [description, setDescription] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [dueDate, setDueDate] = useState<string>();
  const [completed, setCompleted] = useState<boolean>(false);
  const taskList = useStore();

  const addTask = useCallback(() => {
      if (title && description && dueDate) {
          taskList.addTask({
              title: title,
              description: description,
              due_date: dueDate,
              completed: completed,
          });
          setDescription('');
          setTitle('');
          setDueDate('');
          setCompleted(false);
      }
  }, [description, title, dueDate]);

  return (
    <div>
        <TextField
            label="Title"
            variant="outlined"
            onKeyDown={onEnterPress(addTask)}
            onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
            label="Description"
            multiline
            rows={4}
            variant="outlined"
            onKeyDown={onEnterPress(addTask)}
            onChange={(e) => setDescription(e.target.value)}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker disablePast onChange={(value: Date | null, context: PickerChangeHandlerContext<DateValidationError>) => {
                setDueDate(value?.toISOString())
            }} />
        </LocalizationProvider>
        <div>
            <Button onClick={addTask} variant="contained">Add</Button>
        </div>
    </div>
  );
};
