import React, { useEffect, useState } from "react"
import Navbar from "../../components/Navbar"
import axiosInstance from "../../utils/axiosInstance"
import TravelStoryCard from "../../components/TravelStoryCard"
import { ToastContainer, toast } from "react-toastify"
import { IoMdAdd } from "react-icons/io"
import Modal from "react-modal"
import AddEditTravelStory from "../../components/AddEditTravelStory"
import ViewTravelStory from "./ViewTravelStory"
import EmptyCard from "../../components/EmptyCard"
import { DayPicker } from "react-day-picker"
import moment from "moment"
import FilterInfoTitle from "../../components/FilterInfoTitle"
import { getEmptyCardMessage } from "../../utils/helper"

const Home = () => {
  const [allStories, setAllStories] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("")
  const [dateRange, setDateRange] = useState({ from: null, to: null })

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  })

  const [openViewModal, setOpenViewModal] = useState({
    isShown: false,
    data: null,
  })

  // Get all travel stories
  const getAllTravelStories = async () => {
    try {
      const response = await axiosInstance.get("/travel-story/get-all")

      if (response.data && response.data.stories) {
        setAllStories(response.data.stories)
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.")
    }
  }

  // Handle Edit Story
  const handleEdit = async (data) => {
    setOpenAddEditModal({ isShown: true, type: "edit", data: data })
  }

  const handleViewStory = (data) => {
    setOpenViewModal({ isShown: true, data })
  }

  const updateIsFavourite = async (storyData) => {
    const storyId = storyData._id

    try {
      const response = await axiosInstance.put(
        "/travel-story/update-is-favourite/" + storyId,
        {
          isFavorite: !storyData.isFavorite,
        }
      )

      if (response.data && response.data.story) {
        toast.success("Story updated successfully!")
        getAllTravelStories()
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.")
    }
  }

  // delete story
  const deleteTravelStory = async (data) => {
    const storyId = data._id

    console.log('Frontend: Attempting to delete story:', storyId)
    console.log('Story data:', data)

    try {
      const response = await axiosInstance.delete(
        `/travel-story/delete-story/${storyId}`
      )

      console.log('Delete response:', response.data)

      if (response.data && !response.data.error) {
        toast.success("Story deleted successfully!")
        setOpenViewModal((prevState) => ({ ...prevState, isShown: false }))
        getAllTravelStories()
      }
    } catch (error) {
      console.error("Frontend error deleting story:", error)
      console.error("Error response data:", error.response?.data)
      console.error("Error status:", error.response?.status)
      
      if (error.response?.status === 404) {
        toast.error("Story not found or already deleted")
      } else if (error.response?.status === 403) {
        toast.error("You don't have permission to delete this story")
      } else if (error.response?.status === 500) {
        toast.error(`Server error: ${error.response?.data?.message || 'Unknown error'}`)
      } else {
        toast.error("Failed to delete story. Please try again.")
      }
    }
  }

  // search story
  const onSearchStory = async (query) => {
    try {
      const response = await axiosInstance.get("/travel-story/search", {
        params: {
          query: query,
        },
      })

      if (response.data && response.data.stories) {
        setFilterType("search")
        setAllStories(response.data.stories)
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.")
    }
  }

  // Clear search
  const handleClearSearch = () => {
    setFilterType("")
    getAllTravelStories()
  }

  // Handle filter travel story by date range
  const filterStoriesByDate = async (day) => {
    try {
      const startDate = day.from ? moment(day.from).valueOf() : null
      const endDate = day.to ? moment(day.to).valueOf() : null

      if (startDate && endDate) {
        const response = await axiosInstance.get("/travel-story/filter", {
          params: { startDate, endDate },
        })

        if (response.data && response.data.stories) {
          setFilterType("date")
          setAllStories(response.data.stories)
        }
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.")
    }
  }

  // Handle date range click
  const handleDayClick = (day) => {
    setDateRange(day)
    filterStoriesByDate(day)
  }

  const resetFilter = () => {
    setDateRange({ from: null, to: null })
    setFilterType("")
    getAllTravelStories()
  }

  useEffect(() => {
    getAllTravelStories()
  }, [])

  return (
    <>
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchNote={onSearchStory}
        handleClearSearch={handleClearSearch}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-800 to-gray-900">
        <div className="container mx-auto px-4 py-8 lg:py-12">
          <FilterInfoTitle
            filterType={filterType}
            filterDate={dateRange}
            onClear={resetFilter}
          />

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              {allStories.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {allStories.map((item) => (
                    <TravelStoryCard
                      key={item._id}
                      imageUrl={item.imageUrl}
                      title={item.title}
                      story={item.story}
                      date={item.visitedDate}
                      visitedLocation={item.visitedLocation}
                      isFavourite={item.isFavorite}
                      onEdit={() => handleEdit(item)}
                      onClick={() => handleViewStory(item)}
                      onFavouriteClick={() => updateIsFavourite(item)}
                    />
                  ))}
                </div>
              ) : (
                <EmptyCard
                  imgSrc="https://images.pexels.com/photos/5706021/pexels-photo-5706021.jpeg?auto=compress&cs=tinysrgb&w=600"
                  message={getEmptyCardMessage(filterType)}
                  setOpenAddEditModal={() =>
                    setOpenAddEditModal({
                      isShown: true,
                      type: "add",
                      data: null,
                    })
                  }
                />
              )}
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-80">
              <div className="bg-white/95 backdrop-blur-sm border border-gray-200 shadow-xl rounded-2xl overflow-hidden sticky top-24">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4">
                  <h3 className="text-white font-bold text-lg flex items-center gap-2">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2"/>
                      <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2"/>
                      <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2"/>
                      <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"/>
                    </svg>
                    Filter by Date
                  </h3>
                </div>
                <div className="p-6">
                  <DayPicker
                    captionLayout="dropdown"
                    mode="range"
                    selected={dateRange}
                    onSelect={handleDayClick}
                    pagedNavigation
                    className="!font-sans"
                    modifiersClassNames={{
                      selected: "!bg-emerald-500 !text-white hover:!bg-emerald-600",
                      today: "!bg-amber-100 !text-amber-800 font-bold"
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add & Edit Travel Story Modal */}
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 999,
            backdropFilter: "blur(4px)",
          },
          content: {
            border: "none",
            borderRadius: "16px",
            padding: "0",
            background: "transparent",
            overflow: "visible",
          },
        }}
        appElement={document.getElementById("root")}
        className="w-[95vw] md:w-[85vw] lg:w-[70vw] xl:w-[60vw] max-w-4xl h-[90vh] mx-auto mt-[5vh] overflow-hidden"
      >
        <div className="h-full overflow-y-auto bg-white rounded-2xl shadow-2xl">
          <div className="p-6 lg:p-8">
            <AddEditTravelStory
              storyInfo={openAddEditModal.data}
              type={openAddEditModal.type}
              onClose={() => {
                setOpenAddEditModal({ isShown: false, type: "add", data: null })
              }}
              getAllTravelStories={getAllTravelStories}
            />
          </div>
        </div>
      </Modal>

      {/* View travel story modal */}
      <Modal
        isOpen={openViewModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 999,
            backdropFilter: "blur(4px)",
          },
          content: {
            border: "none",
            borderRadius: "16px",
            padding: "0",
            background: "transparent",
            overflow: "visible",
          },
        }}
        appElement={document.getElementById("root")}
        className="w-[95vw] md:w-[85vw] lg:w-[70vw] xl:w-[60vw] max-w-4xl h-[90vh] mx-auto mt-[5vh] overflow-hidden"
      >
        <div className="h-full overflow-y-auto bg-white rounded-2xl shadow-2xl">
          <div className="p-6 lg:p-8">
            <ViewTravelStory
              storyInfo={openViewModal.data || null}
              onClose={() => {
                setOpenViewModal((prevState) => ({ ...prevState, isShown: false }))
              }}
              onEditClick={() => {
                setOpenViewModal((prevState) => ({ ...prevState, isShown: false }))
                handleEdit(openViewModal.data || null)
              }}
              onDeleteClick={() => {
                deleteTravelStory(openViewModal.data || null)
              }}
            />
          </div>
        </div>
      </Modal>

      {/* Floating Action Button */}
      <button
        className="fixed right-6 bottom-6 w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 active:scale-95 z-50 group"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null })
        }}
        title="Add new travel story"
      >
        <IoMdAdd className="text-2xl group-hover:rotate-90 transition-transform duration-300" />
      </button>

      <ToastContainer 
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  )
}

export default Home
