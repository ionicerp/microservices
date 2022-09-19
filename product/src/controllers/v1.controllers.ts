import { Request, Response } from 'express';

export const createData = (req: Request, res: Response) => {
  try {
    const body = req.body
    res.status(200).send({ message: 'createData', status: 'success', data: body });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ message: error.message, status: 'error', data: error });
  }
};

export const getData = (req: Request, res: Response) => {
  try {
    const id = req.query.id
    res.status(200).send({ message: 'getData', status: 'success', data: id });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ message: error.message, status: 'error', data: error });
  }
};

export const listData = (req: Request, res: Response) => {
  try {
    const body = req.body
    res.status(200).send({ message: 'listData', status: 'success', data: body });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ message: error.message, status: 'error', data: error });
  }
};

export const updateData = (req: Request, res: Response) => {
  try {
    const body = req.body
    res.status(200).send({ message: 'updateData', status: 'success', data: body });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ message: error.message, status: 'error', data: error });
  }
};

export const deleteData = (req: Request, res: Response) => {
  try {
    const id = req.query.id
    res.status(200).send({ message: 'deleteData', status: 'success', data: id });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ message: error.message, status: 'error', data: error });
  }
};