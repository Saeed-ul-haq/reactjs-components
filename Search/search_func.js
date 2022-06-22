
  const filterArray = (value, arrayToBeFiltered) => {
    if (value) {
      return arrayToBeFiltered.filter(
        elem =>
          JSON.stringify(elem)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          convertToLocalDateTime(moment(elem.endTime)).includes(value) ||
          convertToLocalDateTime(moment(elem.startTime)).includes(value) ||
          convertToLocalDateTime(moment(elem.created)).includes(value) ||
          convertToLocalDateTime(moment(elem.date)).includes(value),
      )
    } else {
      return arrayToBeFiltered
    }
  }