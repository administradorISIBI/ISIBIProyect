import { useState, useEffect } from 'react'

const doesObjectContainValue = (obj, value) => {
  if (!obj) return false;

  return Object.values(obj).some(item => {
    if (typeof item === 'object' && item !== null) {
      return doesObjectContainValue(item, value);
    }

    return String(item).toLowerCase().includes(value);
  });
}

const useFilterData = initialData => {
  const [allData, setAllData] = useState(initialData)
  const [filteredData, setFilteredData] = useState(initialData)
  const [value, setValue] = useState('')

  useEffect(() => {
    if (value === '') {
      setFilteredData(allData)
    } else {
      const lowercasedValue = value.toLowerCase()
      const result = allData.filter(data => doesObjectContainValue(data, lowercasedValue))
      setFilteredData(result)
    }
  }, [value, allData])

  return { filteredData, value, setValue, setAllData }
}

export default useFilterData
