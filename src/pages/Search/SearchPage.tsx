import { useState, createContext, useContext, useEffect } from 'react'
import Card from '../../components/common/Card/Card'
import Input from '../../components/common/Input/Input'
import styles from './SearchPage.module.scss'
import Button from '../../components/common/Button/Button'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { useLocation } from 'react-router-dom'
import { CardType } from '../../types/card.type'
import SelectType from '../../components/common/SelectType/SelectType'
import useTitle from '../../hooks/useTitle'
import SelectLocation from '../../components/SelectLocation/SelectionLocation'

interface SearchPageProps {}

const SearchContext = createContext<{
  setCardList?: React.Dispatch<React.SetStateAction<CardType[]>>
}>({})

const SearchFilter = () => {
  const { state } = useLocation()
  const cards = useSelector((state: RootState) => state.produce.cards)
  const { setCardList } = useContext(SearchContext)
  const [showFilter, setShowFilter] = useState(false)
  const [type, setType] = useState(state?.type || 'none')
  const [location, setLocation] = useState(state?.location || '')
  const [keyword, setKeyword] = useState(state?.keyword || '')
  const [_, setSort] = useState('none')
  const handlerFilterBtnClick = () => {
    setShowFilter(!showFilter)
  }

  const handlerSearchBtnClick = () => {
    const cardList = cards.filter((card) => {
      const typeFilter = type === 'none' || card.type === type
      const locationFilter =
        location === 'none' || card.location.includes(location)
      const keywordFilter = card.title
        .toLowerCase()
        .includes(keyword?.toLowerCase())
      return typeFilter && locationFilter && keywordFilter
    })
    setCardList && setCardList(cardList)
    setShowFilter(false)
  }

  return (
    <div className={styles.filter}>
      <div className={`wrapper ${styles.filterContainer}`}>
        <div className={styles.input}>
          <Input
            value={keyword}
            className={styles.innerInput}
            icon={<i className="fa-solid fa-magnifying-glass"></i>}
            placeholder="Bạn muốn tìm gì?"
            onChange={(e) => setKeyword(e.target.value)}
          />
          <div className={styles.filterBtn} onClick={handlerFilterBtnClick}>
            <i className="fa-solid fa-filter"></i>
          </div>
        </div>
        <div className={`${styles.options} ${showFilter ? styles.active : ''}`}>
          <div className={styles.optionHeader}>
            <h3>Bạn muốn tìm gì?</h3>
          </div>
          <div className={styles.optionItem}>
            <SelectType option={type} onChange={setType} />
          </div>
          <div className={styles.optionItem}>
            <SelectLocation onChange={setLocation} />
          </div>
          {/* <div className={styles.optionItem}>
                        <SelectType option={sort} onChange={setType} />
                    </div> */}
          <div className={`${styles.optionItem} ${styles.searchBtn}`}>
            <Button
              type="primary-brightness"
              onClick={() => {
                handlerSearchBtnClick()
              }}
              className={styles.innerBtn}
            >
              <i className="fas fa-search"></i>
              <span>Tìm kiếm</span>
            </Button>
          </div>
          <p
            className={styles.resetFilter}
            onClick={() => {
              setType('none')
              setLocation('')
              setKeyword('')
              setSort('none')
            }}
          >
            <i className="fa-solid fa-rotate-right"></i>
            <span>Xoá bộ lọc</span>
          </p>
        </div>
      </div>
    </div>
  )
}

const SearchPage: React.FC<SearchPageProps> = ({}) => {
  useTitle('Search')
  const { state } = useLocation()
  console.log(state)
  const cards = useSelector((state: RootState) => state.produce.cards).filter(
    (card) => {
      if (!state) return true
      const isType = state.type == 'none' ? true : state.type == card.type
      const isLocation =
        state.location != 'none'
          ? card.location.toLowerCase().includes(state.location.toLowerCase())
          : true
      const isKeyword =
        state.keyword != ''
          ? card.title.toLowerCase().includes(state.keyword.toLowerCase())
          : true
      return isType && isLocation && isKeyword
    }
  )

  const [cardList, setCardList] = useState(cards)
  const [visibleCards, setVisibleCards] = useState(6)

  const loadMoreBtnClickHandler = () => {
    setVisibleCards((prev) => prev + 6)
  }

  useEffect(() => {
    setVisibleCards(6)
  }, [cardList])

  return (
    <SearchContext.Provider value={{ setCardList }}>
      <div className={styles.search}>
        <div className={styles.content}>
          <SearchFilter />
          <div className={`wrapper ${styles.listContainer}`}>
            <ul className={styles.searchList}>
              {cardList.slice(0, visibleCards).map((card) => {
                return (
                  <div className={styles.item} key={card.id}>
                    <Card data={card} to={`/detail/${card.id}`} />
                  </div>
                )
              })}
              {cardList.length === 0 && (
                <h3>Không tìm thấy kết quả nào phù hợp với tìm kiếm của bạn</h3>
              )}
            </ul>
            {visibleCards <= cardList.length && (
              <div className={styles.loadBtn}>
                <Button
                  onClick={loadMoreBtnClickHandler}
                  type="primary-brightness"
                  className={styles.innerLoadBtn}
                >
                  Xem thêm
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </SearchContext.Provider>
  )
}

export default SearchPage
