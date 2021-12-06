interface VerifyDetails {
  name: string;
  dob: string;
}

interface VerifyListItem {
  _id: string;
  name: string;
}

interface Settings {
  mandate: boolean;
  nvMessage: string;
  admin: string;
}

interface VisitListItem {
  _id: string;
  member: string;
  guestName: string;
}

type VisitList = Array<VisitListItem>;
type VerifyList = Array<VerifyListItem>;

interface Error {
  statusCode: number;
  message: string;
}
