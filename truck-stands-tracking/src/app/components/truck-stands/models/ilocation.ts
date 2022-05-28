export interface Ilocation {
  id: 1,
  name: string,
  nameBn: string,
  latitude: number,
  longitude: number,
  truckCounts?: [
    {
      truckType?: string,
      count?: number
    }
  ]
}
