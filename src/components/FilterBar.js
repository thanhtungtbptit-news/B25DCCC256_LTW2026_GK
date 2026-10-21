const FilterBar = ({
  keyword,
  category,
  categories,
  isSearching,
  onKeywordChange,
  onCategoryChange,
}) => (
  <div className="filter-bar">
    <div className="field filter-search-field">
      <label htmlFor="book-search">Tìm kiếm</label>
      <input
        id="book-search"
        type="text"
        value={keyword}
        onChange={onKeywordChange}
        placeholder="Nhập tên sách..."
      />
    </div>
    {isSearching && <span className="searching-text">Đang tìm...</span>}
    <div className="field filter-category-field">
      <label htmlFor="book-category-filter">Thể loại</label>
      <select
        id="book-category-filter"
        value={category}
        onChange={(event) => onCategoryChange(event.target.value)}
      >
        <option value="Tất cả">Tất cả</option>
        {categories.map((item) => (
          <option key={item} value={item}>{item}</option>
        ))}
      </select>
    </div>
  </div>
);

export default FilterBar;
