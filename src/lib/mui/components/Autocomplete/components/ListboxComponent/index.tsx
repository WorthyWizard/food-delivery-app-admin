/* eslint-disable no-prototype-builtins */
import {
  createContext,
  forwardRef,
  HTMLAttributes,
  ReactElement,
  useContext,
  useEffect,
  useRef,
} from "react";
import { ListChildComponentProps, VariableSizeList } from "react-window";
import {
  ListSubheader,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { SelectableOption } from "@/features/form";

// This example was provided by the MUI team https://mui.com/material-ui/react-autocomplete/#virtualization

const LISTBOX_PADDING = 8; // px

type Item = [HTMLAttributes<HTMLLIElement>, SelectableOption, number];

type Group = {
  key: number;
  group: string;
  children: DataSet[];
};

type DataSet = Item | Group;

function renderRow(props: ListChildComponentProps) {
  const { data, index, style } = props;

  const dataSet = data[index] as DataSet;

  const inlineStyle = {
    ...style,
    top: (style.top as number) + LISTBOX_PADDING,
  };

  if (!Array.isArray(dataSet)) {
    return (
      <ListSubheader key={dataSet.key} component="div" style={inlineStyle}>
        {dataSet.group}
      </ListSubheader>
    );
  }

  const renderOptionProps = dataSet[0];
  const option = dataSet[1];

  return (
    <Typography
      noWrap
      component="li"
      variant="body1"
      {...renderOptionProps}
      style={inlineStyle}
    >
      {option.label}
    </Typography>
  );
}

const OuterElementContext = createContext({});

// eslint-disable-next-line react/display-name
const OuterElementType = forwardRef<HTMLDivElement>((props, ref) => {
  const outerProps = useContext(OuterElementContext);

  return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data: any) {
  const ref = useRef<VariableSizeList>(null);

  useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);

  return ref;
}

// Adapter for react-window
export const ListboxComponent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLElement>
>(function ListboxComponent(props, ref) {
  const { children, ...rest } = props;

  const theme = useTheme();

  const smUp = useMediaQuery(theme.breakpoints.up("sm"), {
    noSsr: true,
  });

  const itemData: ReactElement[] = [];

  (children as ReactElement[]).forEach(
    (item: ReactElement & { children?: ReactElement[] }) => {
      itemData.push(item);
      itemData.push(...(item.children || []));
    },
  );

  const itemCount = itemData.length;

  const itemSize = smUp ? 36 : 48;

  const getChildSize = (child: ReactElement) => {
    if (child.hasOwnProperty("group")) {
      return 48;
    }

    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }

    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  const gridRef = useResetCache(itemCount);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={rest}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});
