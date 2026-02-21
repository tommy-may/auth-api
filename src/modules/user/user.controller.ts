import type { UserSchema } from '#/db/models/user.model';
import { UnauthorizedError } from '#/lib/response-errors';
import UserRepository from '#/modules/user/user.repository';
import UserService from '#/modules/user/user.service';
import type { UserDeleteOneParams, UserReadOneParams } from '#/types/request';
import type { ResBody } from '#/types/response';
import type { RequestHandler } from 'express';

export const createUser: RequestHandler<unknown, ResBody> = async (
  request,
  response,
  next
) => {
  try {
    const parsedBody = request.parsedBody as UserSchema;
    const user = await UserService.createUser(parsedBody);

    response.status(201).json({ success: true, data: { user } });
  } catch (err) {
    next(err);
  }
};

export const getUsers: RequestHandler<unknown, ResBody> = async (
  _request,
  response,
  next
) => {
  try {
    const users = await UserRepository.findUsers();

    response
      .status(200)
      .json({ success: true, data: { count: users.length, users } });
  } catch (err) {
    next(err);
  }
};

export const getMe: RequestHandler<unknown, ResBody> = async (
  request,
  response,
  next
) => {
  try {
    if (!request.user) throw new UnauthorizedError('Authentication Required');

    const id = request.user.id;
    const user = await UserService.getUser(id, request.originalUrl);

    response.status(200).json({ success: true, data: { user } });
  } catch (err) {
    next(err);
  }
};

export const getUser: RequestHandler<UserReadOneParams, ResBody> = async (
  request,
  response,
  next
) => {
  try {
    const id = request.params.id;
    const user = await UserService.getUser(id, request.originalUrl);

    response.status(200).json({ success: true, data: { user } });
  } catch (err) {
    next(err);
  }
};

export const deleteUser: RequestHandler<UserDeleteOneParams, ResBody> = async (
  request,
  response,
  next
) => {
  try {
    const id = request.params.id;
    await UserService.deleteUser(id, request.originalUrl);

    response.status(200).json({ success: true, data: { id } });
  } catch (err) {
    next(err);
  }
};
