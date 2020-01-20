  //param format needs to be for example: 2020-01-01T01:00
  const parseTimeToArray = (time) => {
    let min = time.substring(time.length - 2)
    let hours = time.substring(time.length - 5, time.length - 3)
    let day = time.substring(8, 10)
    let month = time.substring(5, 7)
    let year = time.substring(0, 4)

    time = [ year, month, day, hours, min ]
    return time
  }

  export default parseTimeToArray