import { ReactNode } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Autocomplete as MuiAutocomplete,
  AutocompleteProps as MuiAutocompleteProps,
  TextField,
  TextFieldProps,
} from "@mui/material";

import { SelectableOption } from "@/features/form";

import { ListboxComponent } from "./components";
import { StyledPopper } from "./styled";

type FilteredAutocompleteProps = Omit<
  MuiAutocompleteProps<SelectableOption, false, false, false>,
  "renderInput"
>;

export interface AutocompleteProps extends FilteredAutocompleteProps {
  inputProps?: TextFieldProps;
  /** Renders all rows using virtualization. Drastically improves performance with large data sets */
  virtualized?: boolean;
}

export const Autocomplete = (props: AutocompleteProps) => {
  const { inputProps, virtualized, ...rest } = props;

  return (
    <MuiAutocomplete
      fullWidth
      popupIcon={<KeyboardArrowDownIcon />}
      getOptionLabel={(option) => option.label ?? ""}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      renderOption={(props, option, state) =>
        virtualized ? (
          ([props, option, state.index] as ReactNode)
        ) : (
          <li {...props} key={option.value}>
            {option.label}
          </li>
        )
      }
      {...(virtualized && {
        disableListWrap: true,
        PopperComponent: StyledPopper,
        ListboxComponent: ListboxComponent,
      })}
      {...rest}
      renderInput={(params) => <TextField {...params} {...inputProps} />}
    />
  );
};
