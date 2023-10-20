export interface Request {
  url: string
  type?: string
  entryType: string
}

export const getCurrentPageRequests = (): Request[] => {
  return performance.getEntries().map((performance) => {
    return {
      url: performance.name,
      type: (performance as any).initiatorType,
      entryType: performance.entryType,

    }
  })
}
