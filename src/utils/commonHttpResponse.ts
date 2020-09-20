export function postResponse<T>(res: any, handler: () => void, result?: T, error: any = null) {
  try {
    handler();
    res.status(201).json({
      data: result
    });
  } catch (e) {
    res.status(500).json({
      message: error ? error : e
    });
  }
}