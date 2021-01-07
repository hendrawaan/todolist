import './App.css';
import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodoList, deleteTodo } from '../../store/todo'
import { FaTrash, FaEdit } from 'react-icons/fa'
import moment from "moment";

const Home = ({ location }) => {
  const dispatch = useDispatch();
  const { todo } = useSelector(state => state.todo);
  const [showModal, setShowModal] = useState(false);
  const [idTodo, setId] = useState(5)
  const [todoData, setTodo] = useState([])
  const [formTodo, setFormTodo] = useState({
    id: idTodo,
    title: '',
    description: '',
    status: '',
    createdAt: ''
  });
  let todoList = todo?.todoList
  useEffect(() => {
    dispatch(getTodoList());
  }, []);
  useEffect(() => {
    setTodo(todoList)
    console.log(todoData)
  },[todoList]);

  const removeTodo = (e, id) => {
    e.preventDefault()
    let arr = todoData
    setTodo(todoData.filter(function (person) {
      return person.id !== id
    }))

  }
  const updateForm = e => {
    e.preventDefault()
    let value = e.target.value;
    let name = e.target.name;
    setFormTodo({
      ...formTodo,
      [name]: value
    });

  };
  const updateTodo = e => {

  };
  const addTodo = e => {
    e.preventDefault()
    e.stopPropagation();
    let arr = {
      id: idTodo,
      title: formTodo['title'],
      description: formTodo['description'],
      status: 0,
      createdAt: Date.now()
    }
    setTodo([...todoData, arr])
    let angka = idTodo + 1
    setId(angka)
    setShowModal(false)
    e.preventDefault()
    e.stopPropagation();
  }
  const addModalForm = () => {
    return (
      <>
        <div
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"

        >
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                <h3 className="text-3xl font-semibold">
                  Add Todo
                  </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                    </span>
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                <form class="mb-4 md:flex md:flex-wrap md:justify-between"
                  onSubmit={addTodo}
                >
                  <div class="flex flex-col mb-4 md:w-full">
                    <label class="mb-2 uppercase tracking-wide font-bold text-lg text-grey-darkest" for="title">Title</label>
                    <input onChange={updateForm} class="border py-2 px-3 text-grey-darkest md:mr-2" type="text" name="title" id="title" />
                  </div>
                  <div class="flex flex-col mb-4 md:w-full">
                    <label class="mb-2 uppercase font-bold text-lg text-grey-darkest" for="description">Description</label>
                    <textarea onChange={updateForm} class="border py-2 px-3 text-grey-darkest" type="text" name="description" id="description" />
                  </div>
                  <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      style={{ transition: "all .15s ease" }}
                      onClick={() => setShowModal(false)}
                    >
                      Close
                  </button>
                    <button
                      className="bg-blue-500 text-white hover:bg-blue-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                      type="submit"
                      style={{ transition: "all .15s ease" }}
                    >
                      Add Todo
                  </button>
                  </div>
                </form>
              </div>
              {/*footer*/}

            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    )
  }
  const Listing = (arr) => {
    let dateFormat = "DD-MM-YYYY"
    return (
      <>
        {arr?.map(function (item, i) {
          return (
            <div className="block group hover:bg-blue p-4 border-b gap-1" key={i}>
              <div className="grid grid-cols-4 grid-rows-1">
                <div className="col-span-3 ">
                  <p className="font-bold row-span-1 text-lg mb-1 text-black group-hover:text-white">{item.title}</p>
                  <p className="text-black row-span-1 mb-2 group-hover:text-white">{item.description}</p>
                </div>
                <div className="col-span-1">
                  <div className="grid grid-cols-2">
                    <p className="text-grey-100 text-xs col-span-1 mb-2 group-hover:text-white">{moment(item.createdAt).format(dateFormat)}</p>
                  </div>
                  <div className="grid grid-cols-2">
                    <FaEdit className="col-span-1 text-orange-500 hover:text-orange-700" />
                    <FaTrash onClick={(e) => removeTodo(e, item.id)} className="col-span-1 text-red-500 hover:text-red-700" />

                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </>
    )
  }
  const ListTodo = () => {
    let listTodo = todoData?.filter(function (item) { return item.status === 0 })
    let listDone = todoData?.filter(function (item) { return item.status === 1 })
    return (
      <>
        <div className="bg-blue-300 text-white text-center col-span-1">
          To do
        </div>
        {Listing(listTodo)}
        <div className="bg-green-300 text-white text-center col-span-1">
          Done
        </div>
        {Listing(listDone)}
      </>
    )

  }
  return (
    <>
      <header className="lg:px-16 px-6 bg-blue-700 flex flex-wrap items-center lg:py-0 py-2">
        <div className="flex-1 flex justify-between items-center">
          <a href="#">
            <svg width="32" height="36" viewBox="0 0 32 36" xmlns="http://www.w3.org/2000/svg"><path d="M15.922 35.798c-.946 0-1.852-.228-2.549-.638l-10.825-6.379c-1.428-.843-2.549-2.82-2.549-4.501v-12.762c0-1.681 1.12-3.663 2.549-4.501l10.825-6.379c.696-.41 1.602-.638 2.549-.638.946 0 1.852.228 2.549.638l10.825 6.379c1.428.843 2.549 2.82 2.549 4.501v12.762c0 1.681-1.12 3.663-2.549 4.501l-10.825 6.379c-.696.41-1.602.638-2.549.638zm0-33.474c-.545 0-1.058.118-1.406.323l-10.825 6.383c-.737.433-1.406 1.617-1.406 2.488v12.762c0 .866.67 2.05 1.406 2.488l10.825 6.379c.348.205.862.323 1.406.323.545 0 1.058-.118 1.406-.323l10.825-6.383c.737-.433 1.406-1.617 1.406-2.488v-12.757c0-.866-.67-2.05-1.406-2.488l-10.825-6.379c-.348-.21-.862-.328-1.406-.328zM26.024 13.104l-7.205 13.258-3.053-5.777-3.071 5.777-7.187-13.258h4.343l2.803 5.189 3.107-5.832 3.089 5.832 2.821-5.189h4.352z"></path></svg>
          </a>
        </div>
      </header>
      <div className="antialiased bg-gray-200 ">
        <div className="md:container md:mx-auto">
          <div className="grid grid-cols-1 items-center ">
            <h1 className="text-2xl text-blue-700 font-bold mb-3 text-center">Todo App</h1>
          </div>
          <div className="grid grid-cols-1 grid-rows-1 md:grid-cols-6 gap-4 items-center">
            <div className="col-span-1 md:col-span-1"></div>
            <div className="rounded overflow-hidden shadow-lg relative col-span-1 row-span-1 md:col-span-4 md:row-span-2 card">

              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 border-b-2 border-fuchsia-600">Todo List</div>

                <div className="font-sans grid grid-cols-1 md:grid-cols-6 grid-rows-1 bg-blue-darker w-full py-8">
                  <div className="overflow-hidden col-span-6 row-span-1 bg-gray-100 gap-2 rounded  w-full shadow-sm  leading-normal">
                    <ListTodo />
                  </div>
                </div>
              </div>

            </div>
            <div className="col-span-1 md:col-span-1">
              <button
                className="rounded-full bg-blue-500 text-white hover:bg-blue-800 font-bold uppercase text-center text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                type="button"
                style={{ transition: "all .15s ease" }}
                onClick={() => setShowModal(true)}
              >
                Add Todo
            </button>
              {showModal ? addModalForm() : null}
            </div>
          </div>

        </div>
      </div>

    </>
  );
}

export default Home;
