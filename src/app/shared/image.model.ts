export class Image {
  constructor(
    public description: string,
    public alt_description: string,
    public created_at: Date,
    public id: string,
    public total_likes: number,
    public path: string,
    public regPath: string,
    public creator: string,
    public tags: string[] | null,
    public total_downloads: number | null
  ) {}
}
