import React, { useState } from 'react';
import { Checkbox, List, ListItem, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

interface Department {
    department: string;
    sub_departments: string[];
}

interface DepartmentListProps {
    data: Department[];
}

const DepartmentList: React.FC<DepartmentListProps> = ({ data }) => {
    const [expanded, setExpanded] = useState<string[]>([]);
    const [selected, setSelected] = useState<string[]>([]);

    const handleToggle = (item: string) => () => {
        const isExpanded = expanded.includes(item);
        setExpanded(isExpanded ? expanded.filter((i) => i !== item) : [...expanded, item]);
    };

    const handleSelect = (item: string) => () => {
        setSelected((prevSelected) => {
            const isSelected = prevSelected.includes(item);
            const updatedSelected = isSelected
                ? prevSelected.filter((i) => i !== item)
                : [...prevSelected, item];

            // If it's a department, select/deselect all sub-departments
            const department = data.find((d) => d.department === item);
            if (department) {
                return isSelected
                    ? updatedSelected.filter((i) => !department.sub_departments.includes(i))
                    : [...updatedSelected, ...department.sub_departments];
            }

            // If it's a sub-department, check if all sub-departments are selected
            const parentDepartment = data.find((d) =>
                d.sub_departments.includes(item)
            );
            if (parentDepartment) {
                const allSubDepartmentsSelected = parentDepartment.sub_departments.every((subDep) =>
                    updatedSelected.includes(subDep)
                );

                return allSubDepartmentsSelected
                    ? updatedSelected.filter((i) => i !== parentDepartment.department)
                    : updatedSelected;
            }

            return updatedSelected;
        });
    };

    return (
        <List>
            {data.map((department) => (
                <React.Fragment key={department.department}>
                    <ListItem button >
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={selected.includes(department.department)}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': department.department }}
                                onClick={handleSelect(department.department)}
                            />
                        </ListItemIcon>
                        <ListItemText primary={department.department} />
                        {expanded.includes(department.department) ? <ExpandLess onClick={handleToggle(department.department)} /> : <ExpandMore onClick={handleToggle(department.department)} />}
                    </ListItem>
                    <Collapse in={expanded.includes(department.department)} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {department.sub_departments.map((subDepartment) => (
                                <ListItem
                                    key={subDepartment}
                                    button
                                    sx={{ pl: 4 }} // Indent sub-departments
                                    onClick={handleSelect(subDepartment)}
                                >
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={selected.includes(subDepartment)}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': subDepartment }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary={subDepartment} />
                                </ListItem>
                            ))}
                        </List>
                    </Collapse>
                </React.Fragment>
            ))}
        </List>
    );
};

// Hardcoded JSON data

export default DepartmentList;

