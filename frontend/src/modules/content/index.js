import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { MenuItem, FormControl, InputLabel, Button, Select, CircularProgress, Dialog, DialogContent, DialogTitle, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, colors } from "@mui/material";
import { getAllContent, createContent, updateContent, deleteContent } from './ContentController'
import { getAllTheme } from '../theme/ThemeController'
import { AuthContext } from "../../services/AuthContext";
import { assetsImg } from "../../assets";

const API_URL = process.env.REACT_APP_API_URL

const ContentView = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [theme, setTheme] = useState({});
  const [video, setVideo] = useState('');
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);

  const [editObj, setEditObj] = useState({});
  const [isEdit, isEditchange] = useState(false);

  const [rowPerPage, setRowPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [popup, setPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [allContent, setAllContent] = useState([]);
  const [contentList, setContentlist] = useState([]);
  const [allTheme, setAllTheme] = useState([]);
  
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(editObj).length > 0) {
      setName(editObj.name);
      setDescription(editObj.description);
      setTheme(editObj.theme);
      setFiles(editObj.files ? editObj.files : []);

      const filenameUrl = []
      if (editObj.filenames) {
        for (let index = 0; index < editObj.filenames.length; index++) {
          filenameUrl.push(`${API_URL}/uploads/${editObj.filenames[index]}`)
        }
      }
      setImages(filenameUrl)

      setVideo(editObj.video);
    } else {
      clearState();
    }
  }, [editObj])

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    setLoading(true)

    const allContent = await getAllContent();
    const allTheme = await getAllTheme();

    setLoading(false)

    allContent.data.sort((a, b) => Date.parse(b.createDate) - Date.parse(a.createDate));

    setAllContent(allContent.data)
    setAllTheme(allTheme.data)
    setContentlist(allContent.data)
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
    objData.append("theme", theme._id)
    objData.append("user", user._id)
    objData.append("video", video)

    // Añadir cada objeto File al FormData
    for (var i = 0; i < files.length; i++) {
      objData.append('files', files[i]);
    }

    if (isEdit) {
      await updateContent(objData);
    } else {
      await createContent(objData);
    }

    fetchData()
    closePopup();
    setLoading(false)
  }

  const handleEdit = async (item) => {
    setLoading(true)
    isEditchange(true);
    setPopup(true);
    setEditObj(item)

    setTimeout(() => {
      setLoading(false)
    }, 10);
  }

  const handleRemove = async (id) => {
    if (window.confirm('Do you want to remove?')) {
      setLoading(true)

      await deleteContent(id)
      await fetchData();

      setLoading(false)
    }
  }

  const clearState = () => {
    setName('');
    setDescription('');
    setTheme({});
    setFiles([]);
    setImages([])
    setVideo('')
  }

  const handleFilter = (value) => {
    setFilter(value)

    if (value.length > 0) {
      const filteredList = contentList.filter((item) => {
        return item.name.toLowerCase().includes(value.toLowerCase()) || item.description.toLowerCase().includes(value.toLowerCase());
      });

      setContentlist(filteredList);
    } else {
      setContentlist(allContent);
    }
  }

  const handleFileUpload = (event) => {
    if (event.target.files.length > 3) {
      return toast.warning('Only 3 files accepted')
    }

    const fileList = []
    const imageList = []

    for (let i = 0; i < event.target.files.length; i++) {
      const objUrl = URL.createObjectURL(event.target.files[i]);

      fileList.push(event.target.files[i])
      imageList.push(objUrl)
    }

    setFiles(fileList)
    setImages(imageList);
  };

  const handleDetail = (item) => {
    navigate(`/dashboard/content/detail`, { state: { item } });
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
                      <TableCell style={{ color: 'white' }} >{'Theme'}</TableCell>
                      <TableCell style={{ color: 'white', width: '120px' }} >{'Action'}</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {contentList
                      .slice(page * rowPerPage, page * rowPerPage + rowPerPage)
                      .map((row, i) => {
                        return (
                          <TableRow key={i} style={{ cursor: 'pointer' }}>
                            <TableCell onClick={() => handleDetail(row)}>{row.name}</TableCell>
                            <TableCell onClick={() => handleDetail(row)}>{row.description}</TableCell>
                            <TableCell onClick={() => handleDetail(row)}>{row.theme.name}</TableCell>
                            <TableCell align={'right'} >
                              {
                                user.type === 'admin' || user._id === row.user._id ?
                                <>
                                  <IconButton onClick={e => { handleEdit(row) }}> 
                                    <EditIcon style={{ color: colors.green[600], cursor: 'pointer' }} ></EditIcon>
                                  </IconButton>
                                  <IconButton onClick={e => { handleRemove(row._id) }}>
                                    <DeleteIcon style={{ color: colors.red[500], cursor: 'pointer' }} ></DeleteIcon>
                                  </IconButton>
                                </>
                                : null
                              }
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
              count={contentList.length}
              component={'div'}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowPerPage}
            />
          }
        </div>
      </Paper>

      <Dialog open={popup} onClose={closePopup} fullWidth maxWidth="sm">
        <DialogTitle>
          <span>{isEdit ? 'Update Content' : 'Create Content'}</span>
          <IconButton style={{ float: 'right' }} onClick={closePopup}><CloseIcon color="primary"></CloseIcon></IconButton>
        </DialogTitle>
        <DialogContent>
          {loading ? <CircularProgress color="success" /> :
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

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Theme</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={theme}
                    label="Theme"
                    onChange={(e) => {
                      setTheme(e.target.value);
                    }}
                  >
                    <MenuItem value={theme} selected={true}>{theme.name}</MenuItem>
                    {
                      allTheme
                        .filter(item => item.name !== theme.name)
                        .map(item => (
                          <MenuItem key={item._id} value={item}>{item.name}</MenuItem>
                        ))
                    }
                  </Select>
                </FormControl>

                {
                  theme.permission && theme.permission.some(objeto => objeto.name === "imagenes") ? (
                    <>
                      <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleFileUpload}
                        multiple
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
                          {
                            images.length === 0 ? (
                              <img src={assetsImg.blankPhoto} alt="File" style={{ maxWidth: 'inherit', maxHeight: 'inherit' }} />
                            ) : (
                              images.map((imageUrl, index) => (
                                <React.Fragment key={index}>
                                  <img key={index} src={imageUrl} alt="File" style={{ maxWidth: 'inherit', maxHeight: 'inherit', marginRight: 5 }} />
                                  {index % 3 === 0 ? <br /> : null}
                                </React.Fragment>
                              ))
                            )
                          }
                        </Button>
                      </div>
                    </>
                  ) : null
                }

                {
                  theme.permission && theme.permission.some(objeto => objeto.name === "videos-url") ? (
                    <TextField
                      autoComplete="off"
                      value={video}
                      onChange={e => { setVideo(e.target.value) }}
                      variant="outlined"
                      label="Youtobe Video"
                    />
                  ) : null
                }

                <Button variant="contained" type="submit">{isEdit ? 'Update' : 'Create'}</Button>
              </Stack>
            </form>
          }
        </DialogContent>
      </Dialog>
    </div >
  );
}

export default ContentView;