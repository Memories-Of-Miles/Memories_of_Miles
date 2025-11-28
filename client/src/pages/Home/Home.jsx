import React, { useEffect, useState } from "react"
import Navbar from "../../components/Navbar"
import axiosInstance from "../../utils/axiosInstance"
import TravelStoryCard from "../../components/TravelStoryCard"
import { IoMdAdd } from "react-icons/io"
import Modal from "react-modal"
import AddEditTravelStory from "../../components/AddEditTravelStory"
import ViewTravelStory from "./ViewTravelStory"
import EmptyCard from "../../components/EmptyCard"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import FilterInfoTitle from "../../components/FilterInfoTitle"
import { DayPicker } from "react-day-picker"
import moment from "moment"
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
        
        // Optimistic update or refresh
        if(filterType === "search" && searchQuery) {
             onSearchStory(searchQuery);
        } else if (filterType === "date") {
             filterStoriesByDate(dateRange);
        } else {
             getAllTravelStories();
        }
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.")
    }
  }

  // delete story
  const deleteTravelStory = async (data) => {
    const storyId = data._id

    try {
      const response = await axiosInstance.delete(
        `/travel-story/delete-story/${storyId}`
      )

      if (response.data && !response.data.error) {
        toast.success("Story deleted successfully!")
        setOpenViewModal((prevState) => ({ ...prevState, isShown: false }))
        getAllTravelStories()
      }
    } catch (error) {
        toast.error("Failed to delete story. Please try again.")
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
    getAllTravelStories();
  }, [])

  return (
    <div className="min-h-screen bg-gray-950 text-white font-display pb-20 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-indigo-900/20 to-transparent pointer-events-none" />
      
      <Navbar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        onSearchNote={onSearchStory} 
        handleClearSearch={handleClearSearch}
      />

      <div className="container mx-auto px-4 py-10 relative z-10">
        <FilterInfoTitle
            filterType={filterType}
            filterDate={dateRange}
            onClear={resetFilter}
        />

        <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content Area */}
            <div className="flex-1">
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-white">Your Journeys</h2>
                        <p className="text-gray-400 mt-1">Capture the moments that matter.</p>
                    </div>
                    <div className="text-sm text-gray-500 hidden sm:block bg-gray-900/50 px-3 py-1 rounded-lg border border-gray-800">
                        {allStories.length} Stories Found
                    </div>
                </div>

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
                    message={getEmptyCardMessage(filterType)}
                    setOpenAddEditModal={() => setOpenAddEditModal({ isShown: true, type: "add", data: null })}
                />
                )}
            </div>

            {/* Sidebar Filter - Desktop Only */}
            <div className="w-full lg:w-80 hidden lg:block">
              <div className="glass rounded-2xl overflow-hidden sticky top-28 border border-gray-800">
                <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-4 border-b border-white/10">
                  <h3 className="text-white font-bold text-lg flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Filter by Date
                  </h3>
                </div>
                <div className="p-4 bg-gray-900/60">
                  <DayPicker
                    captionLayout="dropdown"
                    mode="range"
                    selected={dateRange}
                    onSelect={handleDayClick}
                    pagedNavigation
                    className="!font-sans text-gray-200"
                    modifiersClassNames={{
                      selected: "!bg-indigo-600 !text-white hover:!bg-indigo-500",
                      today: "!text-indigo-400 font-bold",
                      day: "hover:bg-gray-800 rounded-full"
                    }}
                    styles={{
                        caption: { color: '#e2e8f0' },
                        head_cell: { color: '#94a3b8' },
                    }}
                  />
                </div>
              </div>
            </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setOpenAddEditModal({ isShown: true, type: "add", data: null })}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-indigo-500/40 hover:scale-110 transition-transform duration-300 z-50 group"
        aria-label="Add Story"
      >
        <IoMdAdd className="text-3xl group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* Modals */}
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: { backgroundColor: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)", zIndex: 1000 },
          content: { background: "transparent", border: "none", inset: "unset", padding: 0 }
        }}
        className="w-[95vw] md:w-[85vw] lg:w-[70vw] xl:w-[60vw] max-w-4xl h-[90vh] mx-auto mt-[5vh] outline-none"
        appElement={document.getElementById("root")}
      >
        <div className="h-full overflow-y-auto rounded-3xl scrollbar-hide">
            <AddEditTravelStory
            storyInfo={openAddEditModal.data}
            type={openAddEditModal.type}
            onClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
            getAllTravelStories={getAllTravelStories}
            />
        </div>
      </Modal>

      <Modal
        isOpen={openViewModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: { backgroundColor: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)", zIndex: 1000 },
          content: { background: "transparent", border: "none", inset: "unset", padding: 0 }
        }}
        className="w-[95vw] md:w-[85vw] lg:w-[70vw] xl:w-[60vw] max-w-4xl h-[90vh] mx-auto mt-[5vh] outline-none"
        appElement={document.getElementById("root")}
      >
        <div className="h-full overflow-y-auto bg-gray-900 rounded-3xl border border-gray-700 shadow-2xl">
            <div className="p-6 md:p-8">
                <ViewTravelStory
                storyInfo={openViewModal.data || null}
                onClose={() => setOpenViewModal((prevState) => ({ ...prevState, isShown: false }))}
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
      
      <ToastContainer theme="dark" position="bottom-right" />
    </div>
  )
}

export default Home