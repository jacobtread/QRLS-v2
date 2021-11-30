interface VerifyDetails {
  name: string;
  dob: string;
}

interface VerifyListItem {
  _id: string;
  name: string;
}

type VerifyList = Array<VerifyListItem>

interface Error {
  statusCode: number;
  message: string;
}