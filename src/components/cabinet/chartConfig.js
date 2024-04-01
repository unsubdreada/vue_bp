export const data = {
  labels: [],
  datasets: [
    {
      backgroundColor: [
        '#FF6F61',
        '#6B5B95',
        '#88B04B',
        '#F7CAC9',
        '#92A8D1',
        '#F4D35E',
        '#D9AFAD',
        '#9B2335',
        '#3D315B',
        '#2A9D8F'
      ],
      data: []
    }
  ]
}

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'right',
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
        padding: 15
      }
    }
  }
}
