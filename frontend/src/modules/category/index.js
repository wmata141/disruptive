import React, { useState, useEffect, useContext } from "react";
import CloseIcon from "@mui/icons-material/Close"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, CircularProgress, Dialog, DialogContent, DialogTitle, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, colors } from "@mui/material";
import { getAllCategory, createCategory, updateCategory, deleteCategory } from './CategoryController'
import { assetsImg } from "../../assets";
import { AuthContext } from "../../services/AuthContext";

const API_URL = process.env.REACT_APP_API_URL

const CategoryView = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(assetsImg.blankPhoto);

  const [editObj, setEditObj] = useState({});
  const [isEdit, isEditchange] = useState(false);

  const [rowPerPage, setRowPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [popup, setPopup] = useState(false);
  const [allCategory, setAllCategory] = useState([]);
  const [categorylist, setCategorylist] = useState([]);

  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (Object.keys(editObj).length > 0) {
      setName(editObj.name);
      setDescription(editObj.description);
      setFile(editObj.file);
      setImage(editObj.file ? `${API_URL}/uploads/${editObj.filename}` : assetsImg.blankPhoto)
    } else {
      clearState();
    }
  }, [editObj])

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    setLoading(true)
    const allCategory = await getAllCategory();
    setLoading(false)

    allCategory.data.sort((a, b) => Date.parse(b.createDate) - Date.parse(a.createDate));

    setAllCategory(allCategory.data)
    setCategorylist(allCategory.data)
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

    const objData = new FormData();

    objData.append("_id", editObj._id)
    objData.append("name", name)
    objData.append("description", description)
    objData.append("file", file)

    if (isEdit) {
      await updateCategory(objData);
    } else {
      await createCategory(objData);
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

      await deleteCategory(id)
      await fetchData();

      setLoading(false)
    }
  }

  const clearState = () => {
    setName('');
    setDescription('');
    setFile(null);
    setImage(assetsImg.blankPhoto)
  }

  const handleFileUpload = (event) => {
    const objUrl = URL.createObjectURL(event.target.files[0])
    setFile(event.target.files[0])
    setImage(objUrl);
  };

  const handleFilter = (value) => {
    setFilter(value)

    if (value.length > 0) {
      const filteredList = categorylist.filter((item) => {
        return item.name.toLowerCase().includes(value.toLowerCase()) || item.description.toLowerCase().includes(value.toLowerCase());
      });

      setCategorylist(filteredList);
    } else {
      setCategorylist(allCategory);
    }
  }

  return (
    <div>
      <Paper sx={{ margin: '1%' }}>
        <div style={{ margin: '1%', paddingTop: '1%' }}>
          <Button
            style={{ backgroundColor: colors.blue[500], marginRight: '1%', height: '2.5rem' }}
            onClick={functionAdd}
            variant="contained"
            disabled={user.type !== 'admin'}
          >Add New
          </Button>
          <TextField
            autoComplete="off"
            value={filter}
            onChange={e => { handleFilter(e.target.value) }}
            variant="outlined"
            // label="Filter"
            size="small"
          />
        </div>
        <div style={{ margin: '1%', textAlign: 'center' }}>
          {
            loading ? <CircularProgress color="success" /> :
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow style={{ backgroundColor: colors.blue[500] }}>                     
                      <TableCell style={{ color: 'white' }} >{'Name'}</TableCell>
                      <TableCell style={{ color: 'white' }} >{'Description'}</TableCell>
                      <TableCell style={{ color: 'white' }} >{'Image'}</TableCell>
                      <TableCell style={{ color: 'white', width: '120px' }} >{'Action'}</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {categorylist
                      .slice(page * rowPerPage, page * rowPerPage + rowPerPage)
                      .map((row, i) => {
                        return (
                          <TableRow key={i}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.description}</TableCell>
                            <TableCell style={{ padding: 0 }}>
                              <img
                                style={{ maxWidth: 75, maxHeight: 75, width: '-webkit-fill-available' }}
                                src={row.filename ? `${API_URL}/uploads/${row.filename}` : assetsImg.blankPhoto}
                                alt="Imagen"
                              />
                            </TableCell>
                            <TableCell>
                              <IconButton onClick={e => { handleEdit(row) }} disabled={user.type !== 'admin'}>
                                <EditIcon style={{ color: colors.green[500], cursor: 'pointer' }} ></EditIcon>
                              </IconButton>
                              <IconButton onClick={e => { handleRemove(row._id) }} disabled={user.type !== 'admin'}>
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
              count={categorylist.length}
              component={'div'}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowPerPage}
            />
          }
        </div>
      </Paper>

      <Dialog open={popup} onClose={closePopup} fullWidth maxWidth="sm">
        <DialogTitle>
          <span>{isEdit ? 'Update Category' : 'Create Category'}</span>
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
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileUpload}
              />

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  component="label"
                  htmlFor="fileInput"
                  sx={{
                    display: 'contents',
                    height: 233,
                    width: 350,
                    maxHeight: { xs: 233, md: 167 },
                    maxWidth: { xs: 350, md: 250 },
                  }}
                >
                  <img src={image} alt="File" style={{ maxWidth: 'inherit', maxHeight: 'inherit' }} />
                </Button>
              </div>

              <Button variant="contained" type="submit">{isEdit ? 'Update' : 'Create'}</Button>
            </Stack>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CategoryView;
