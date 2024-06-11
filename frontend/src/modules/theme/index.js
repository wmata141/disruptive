import React, { useState, useEffect, useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, CircularProgress, Dialog, DialogContent, DialogTitle, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, colors } from "@mui/material";
import { getAllTheme, createTheme, updateTheme, deleteTheme } from './ThemeController'
import { getAllCategory } from '../category/CategoryController'
import { AuthContext } from "../../services/AuthContext";
import { Autocomplete, MenuItem } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const ThemeView = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [editObj, setEditObj] = useState({});
  const [isEdit, isEditchange] = useState(false);

  const [rowPerPage, setRowPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [popup, setPopup] = useState(false);
  const [allTheme, setAllTheme] = useState([]);
  const [themelist, setThemelist] = useState([]);
  const [allCategory, setAllCategory] = useState([]);

  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  const [permission, setPermission] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (Object.keys(editObj).length > 0) {
      setName(editObj.name);
      setDescription(editObj.description);
      setPermission(editObj.permission);
    } else {
      clearState();
    }
  }, [editObj])

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    setLoading(true)

    const allTheme = await getAllTheme();
    const allCategory = await getAllCategory();

    setLoading(false)

    allTheme.data.sort((a, b) => Date.parse(b.createDate) - Date.parse(a.createDate));

    setAllTheme(allTheme.data)
    setAllCategory(allCategory.data)
    setThemelist(allTheme.data)
  };

  const handlePageChange = (event, newpage) => {
    setPage(newpage);
  }

  const handleRowPerPage = (event) => {
    setRowPerPage(+event.target.value);
    setPage(0);
  }

  const functionAdd = () => {
    isEditchange(false);
    openPopup();
  }

  const closePopup = () => {
    setPopup(false);
  }

  const openPopup = () => {
    setPopup(true);
    clearState();
  }

  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    const objData = {
      _id: editObj._id,
      name: name,
      description: description,
      permission: permission
    }

    if (isEdit) {
      await updateTheme(objData);
    } else {
      await createTheme(objData);
    }

    fetchData()
    closePopup();
    setLoading(false)
  }

  const handleEdit = async (item) => {
    isEditchange(true);
    setPopup(true);
    setEditObj(item)
  }

  const handleRemove = async (id) => {
    if (window.confirm('Do you want to remove?')) {
      setLoading(true)

      await deleteTheme(id)
      await fetchData();

      setLoading(false)
    }
  }

  const clearState = () => {
    setName('');
    setDescription('');
    setPermission([])
  }

  const handleFilter = (value) => {
    setFilter(value)

    if (value.length > 0) {
      const filteredList = themelist.filter((item) => {
        return item.name.toLowerCase().includes(value.toLowerCase()) || item.description.toLowerCase().includes(value.toLowerCase());
      });

      setThemelist(filteredList);
    } else {
      setThemelist(allTheme);
    }
  }

  return (
    <div>
      <Paper sx={{ margin: '1%' }}>
        <div style={{ margin: '1%', paddingTop: '1%' }}>
          <Button
            style={{ backgroundColor: colors.blue[600], marginRight: '1%', height: '2.5rem' }}
            onClick={functionAdd}
            variant="contained"
            disabled={user.type === 'reader'}
          >Add New
          </Button>
          <TextField
            autoComplete="off"
            value={filter}
            onChange={e => { handleFilter(e.target.value) }}
            variant="outlined"
            size="small"
          />
        </div>
        <div style={{ margin: '1%', textAlign: 'center' }}>
          {
            loading ? <CircularProgress color="success" /> :
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow style={{ backgroundColor: colors.blue[600] }}>                      
                      <TableCell style={{ color: 'white' }} >{'Name'}</TableCell>
                      <TableCell style={{ color: 'white' }} >{'Description'}</TableCell>
                      <TableCell style={{ color: 'white' }} >{'Permission'}</TableCell>
                      <TableCell style={{ color: 'white', width: '120px' }} >{'Action'}</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {themelist
                      .slice(page * rowPerPage, page * rowPerPage + rowPerPage)
                      .map((row, i) => {
                        return (
                          <TableRow key={i}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.description}</TableCell>
                            <TableCell style={{ padding: 0 }}>
                              {row.permission
                                .map(item => item.name)
                                .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
                                .map(name => (
                                  <h4 key={name} style={{ padding: 0, margin: 0 }}>{name}</h4>
                                ))
                              }
                            </TableCell>
                            <TableCell>
                              <IconButton disabled={user.type === 'reader'} onClick={e => { handleEdit(row) }}>
                                <EditIcon style={{ color: colors.green[600], cursor: 'pointer' }} ></EditIcon>
                              </IconButton>
                              <IconButton disabled={user.type === 'reader'} onClick={e => { handleRemove(row._id) }}>
                                <DeleteIcon style={{ color: colors.red[500], cursor: 'pointer' }} ></DeleteIcon>
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        )
                      })
                    }
                  </TableBody>
                </Table>
              </TableContainer>
          }
          {
            !loading &&
            <TablePagination
              rowsPerPageOptions={[2, 5, 10, 20]}
              rowsPerPage={rowPerPage}
              page={page}
              count={themelist.length}
              component={'div'}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowPerPage}
            />
          }
        </div>
      </Paper>

      <Dialog open={popup} onClose={closePopup} fullWidth maxWidth="sm">
        <DialogTitle>
          <span>{isEdit ? 'Update Theme' : 'Create Theme'}</span>
          <IconButton style={{ float: 'right' }} onClick={closePopup}><CloseIcon color="primary"></CloseIcon></IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handlesubmit}>
            <Stack spacing={2} margin={2}>
              <TextField
                autoComplete="off"
                required
                value={name}
                onChange={e => { setName(e.target.value) }}
                variant="outlined"
                label="Name"
              />
              <TextField
                autoComplete="off"
                required
                value={description}
                onChange={e => { setDescription(e.target.value) }}
                variant="outlined"
                label="Description"
              />

              <Autocomplete
                multiple
                options={allCategory}
                getOptionLabel={(option) => option.name}
                value={permission}
                onChange={(event, newValue) => { setPermission(newValue) }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Category"
                    placeholder="Category"
                  />
                )}
                renderOption={(props, option, { selected }) => (
                  <MenuItem
                    key={option._id}
                    value={option}
                    sx={{ justifyContent: "space-between" }}
                    selected={selected}
                    {...props}
                  >
                    {option.name}
                    {selected ? <CheckIcon color="info" /> : null}
                  </MenuItem>
                )}
              />

              <Button variant="contained" type="submit">{isEdit ? 'Update' : 'Create'}</Button>
            </Stack>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ThemeView;