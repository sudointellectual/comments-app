import * as utils from './dateFormatting'

describe('formatted date strings', () => {
    it('less than 24 hours ago', () => {
        const millisecondsIn24Hours = 24 * 60 * 60 * 1000

        // when comment was posted
        const date = new Date(['2024-02-04', '5:30'])
        // 'current' timestamp less than 24 hours after comment posting
        const now = new Date(['2024-02-03', '18:30'])

        expect(utils.timeAgo(date, now) <= millisecondsIn24Hours).toBe(true)
    })

    it('less than a year ago', () => {
        // date from same year as 'current' timestamp
        const date = new Date(['2023-06-04', '12:30'])
        // 'current' timestamp
        const now = new Date(['2023-02-03', '12:30'])

        expect(date.getFullYear() === now.getFullYear()).toBe(true)
    })

    it('over a year ago', () => {
        // date from 3 years before 'current' timestamp
        const date = new Date(['2020-02-04', '5:30'])
        // 'current' timestamp
        const now = new Date(['2024-02-03', '18:30'])

        expect(date < now).toBe(true)
    })
})

describe('date formatting helpers', () => {
    it('add th suffix to 12', () => {
        let testDate = 12

        expect(utils.formatDayWithSuffix(testDate)).toBe('12th')
    })

    it('add nd suffix to 2', () => {
        let testDate = 2

        expect(utils.formatDayWithSuffix(testDate)).toBe('2nd')
    })

    it('add st suffix to 1', () => {
        let testDate = 1

        expect(utils.formatDayWithSuffix(testDate)).toBe('1st')
    })

    it('add rd suffix to 3', () => {
        let testDate = 3

        expect(utils.formatDayWithSuffix(testDate)).toBe('3rd')
    })

    it('return proper date', () => {
        let testDate = new Date('2024-04-28')

        expect(utils.getDayOfWeek(testDate)).toBe('Sunday')
    })

    it('return proper month', () => {
        let testDate = new Date('2024-04-28')

        expect(utils.getMonthFromDate(testDate)).toBe('April')
    })

    it('timeago to be 0 when current time is passed', () => {
        let currentTime = new Date()

        expect(utils.timeAgo(currentTime, currentTime)).toBe(0)
    })

    it('timeago to be greater than 0 when future time is passed', () => {
        let testTime = new Date('2025-04-28')
        let currentTime = new Date()

        expect(utils.timeAgo(testTime, currentTime)).toBeGreaterThan(0)
    })

    it('dateCreated must be passed a date', () => {
        let currentTime = null

        expect(utils.getDateCreated(currentTime)).toBeUndefined()
    })
})
